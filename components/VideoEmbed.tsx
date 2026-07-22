type VideoEmbedProps = {
  title: string;
  videoUrl: string;
  loading?: "eager" | "lazy";
  posterSrc: string;
};

export function VideoEmbed({
  title,
  videoUrl,
  loading = "lazy",
  posterSrc
}: VideoEmbedProps) {
  const separator = videoUrl.includes("?") ? "&" : "?";
  const src = `${videoUrl}${separator}rel=0&playsinline=1`;
  const escapedTitle = title
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  const srcDoc = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;background:#050505}a{display:block;position:relative;width:100vw;height:100vh;overflow:hidden;background:#050505}img{width:100%;height:100%;object-fit:cover}span{position:absolute;left:50%;top:50%;width:68px;height:68px;transform:translate(-50%,-50%);border-radius:999px;background:rgba(5,5,5,.72);border:1px solid rgba(255,255,255,.34)}span:after{content:"";position:absolute;left:27px;top:21px;border-bottom:13px solid transparent;border-left:19px solid #fff;border-top:13px solid transparent}</style></head><body><a href="${src}" aria-label="Video afspelen: ${escapedTitle}"><img src="${posterSrc}" alt=""><span aria-hidden="true"></span></a></body></html>`;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/[0.12] bg-[#050505]">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full border-0 bg-[#050505]"
        loading={loading}
        referrerPolicy="strict-origin-when-cross-origin"
        srcDoc={srcDoc}
        title={`${title} video`}
      />
    </div>
  );
}
