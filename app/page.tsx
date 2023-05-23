import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <h1>Examples :</h1>
        <ul>
          <li>
            <Link href="/examples/1">Example 1</Link>{" "}
          </li>
          <li>
            <Link href="/examples/2">Example 2</Link>{" "}
          </li>
        </ul>
      </section>
    </main>
  );
}
