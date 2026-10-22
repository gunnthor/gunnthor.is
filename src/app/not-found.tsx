import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap lost" aria-labelledby="lost-heading">
      <p className="label"><b>404</b> Not found</p>
      <h1 id="lost-heading">Off the map.</h1>
      <p>There is nothing at this address. It may have moved, or it may never have existed.</p>
      <div className="actions">
        <Link href="/" className="btn btn--quiet">Back to the start</Link>
        <Link href="/projects" className="action action--next">
          Project index <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
