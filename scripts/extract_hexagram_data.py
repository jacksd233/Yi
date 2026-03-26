import html
import json
import re
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EPUB_PATH = ROOT / "book-23-周易.epub"
CSDN_HTML_PATH = ROOT / "source_csdn.html"
OUT_JSON = ROOT / "hexagram-originals.json"
OUT_JS = ROOT / "hexagram-originals.js"
OUT_TXT = ROOT / "book-23-周易.txt"


LINE_PREFIX_RE = re.compile(r"^(初[九六]|九[二三四五]|六[二三四五]|上[九六])[：:,，]\s*")
LINE_RE = re.compile(r"^(初[九六]|九[二三四五]|六[二三四五]|上[九六])[：:,，]")


def strip_tags(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\s*([，。：；？！])", r"\1", text)
    return text.strip()


def parse_epub(epub_path: Path) -> dict[int, dict]:
    chapters: list[tuple[int, str]] = []
    with zipfile.ZipFile(epub_path, "r") as zf:
        for name in zf.namelist():
            m = re.match(r"OEBPS/Chapter(\d+)\.html$", name)
            if not m:
                continue
            chapter_num = int(m.group(1))
            raw = zf.read(name).decode("utf-8", errors="ignore")
            chapters.append((chapter_num, raw))

    chapters.sort(key=lambda x: x[0])
    if len(chapters) < 64:
        raise RuntimeError(f"EPUB 章节不足 64，当前为 {len(chapters)}")

    result: dict[int, dict] = {}
    for idx, (_, raw) in enumerate(chapters[:64], start=1):
        h1_match = re.search(r"<h1[^>]*>(.*?)</h1>", raw, re.S | re.I)
        p_matches = re.findall(r"<p[^>]*>(.*?)</p>", raw, re.S | re.I)

        name_raw = strip_tags(h1_match.group(1) if h1_match else "")
        name = name_raw.replace("卦", "").strip()

        paragraphs = [strip_tags(p) for p in p_matches]
        judgment = ""
        lines: list[str] = []
        for p in paragraphs:
            if p.startswith("《") and "》：" in p and not judgment:
                judgment = p.split("：", 1)[1].strip()
                continue
            if LINE_RE.match(p):
                if p.startswith("用九") or p.startswith("用六"):
                    continue
                lines.append(LINE_PREFIX_RE.sub("", p))

        if len(lines) < 6:
            raise RuntimeError(f"EPUB 第 {idx} 卦爻辞不足 6 条：{name}")

        result[idx] = {
            "id": idx,
            "name": name,
            "judgmentTextOriginal": judgment,
            "lineTextsOriginal": lines[:6],
        }

    return result


def parse_csdn_tuan_xiang(html_path: Path) -> dict[int, dict]:
    source = html_path.read_text(encoding="utf-8", errors="ignore")
    blocks = list(
        re.finditer(r"<h3[^>]*>([\s\S]*?)</h3>([\s\S]*?)(?=<h3[^>]*>|$)", source, re.I)
    )[:64]
    if len(blocks) != 64:
        raise RuntimeError(f"CSDN 块数量不是 64：{len(blocks)}")

    result: dict[int, dict] = {}
    for block in blocks:
        title = strip_tags(block.group(1))
        body = block.group(2)
        id_match = re.match(r"^\s*(\d{1,2})", title)
        if not id_match:
            continue
        hid = int(id_match.group(1))

        preface_html = re.split(r"<table", body, maxsplit=1, flags=re.I)[0]
        preface = strip_tags(preface_html)

        tuan_match = re.search(r"《彖》曰：([\s\S]*?)《象》曰：", preface)
        xiang_match = re.search(r"《象》曰：([\s\S]*)$", preface)
        judgment_match = re.search(r"^[^：]{1,8}：([\s\S]*?)《彖》曰：", preface)

        result[hid] = {
            "judgmentTextOriginal": judgment_match.group(1).strip() if judgment_match else "",
            "tuanOriginal": tuan_match.group(1).strip() if tuan_match else "",
            "xiangOriginal": xiang_match.group(1).strip() if xiang_match else "",
        }

    return result


def main() -> None:
    epub_data = parse_epub(EPUB_PATH)
    tuan_xiang_data = parse_csdn_tuan_xiang(CSDN_HTML_PATH)

    merged: dict[int, dict] = {}
    txt_sections: list[str] = []
    for hid in range(1, 65):
        e = epub_data.get(hid)
        t = tuan_xiang_data.get(hid, {})
        if not e:
            raise RuntimeError(f"缺少第 {hid} 卦 EPUB 数据")
        merged[hid] = {
            "id": hid,
            "name": e["name"],
            "judgmentTextOriginal": e["judgmentTextOriginal"] or t.get("judgmentTextOriginal", ""),
            "tuanOriginal": t.get("tuanOriginal", ""),
            "xiangOriginal": t.get("xiangOriginal", ""),
            "lineTextsOriginal": e["lineTextsOriginal"],
        }
        txt_sections.append(
            "\n".join(
                [
                    f"第{hid}卦 {e['name']}",
                    f"卦辞：{merged[hid]['judgmentTextOriginal']}",
                    f"彖曰：{merged[hid]['tuanOriginal']}",
                    f"象曰：{merged[hid]['xiangOriginal']}",
                    *[f"{idx + 1}. {line}" for idx, line in enumerate(e["lineTextsOriginal"])],
                ]
            )
        )

    OUT_JSON.write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding="utf-8")
    OUT_JS.write_text(
        "// Auto-generated from local EPUB + source_csdn.html\n"
        + "const HEXAGRAM_ORIGINALS = "
        + json.dumps(merged, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    OUT_TXT.write_text("\n\n".join(txt_sections), encoding="utf-8")
    print(f"generated {OUT_JSON.name}, {OUT_JS.name}, {OUT_TXT.name}")


if __name__ == "__main__":
    main()
