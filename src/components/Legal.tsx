/**
 * Shared building blocks for the legal pages (/privacy, /terms).
 * Kept in one place so both pages stay visually identical.
 */
import type { ReactNode } from "react";

export const Section = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">{title}</h2>
    <div className="space-y-3 text-foreground/80 leading-relaxed">{children}</div>
  </section>
);

export const SubHeading = ({ children }: { children: ReactNode }) => (
  <h3 className="text-lg font-semibold text-foreground mt-7 mb-2">{children}</h3>
);

export const Bullets = ({ items }: { items: ReactNode[] }) => (
  <ul className="list-disc pl-6 space-y-2">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export const InfoTable = ({
  rows,
  head,
}: {
  rows: [ReactNode, ReactNode][];
  head?: [string, string];
}) => (
  <div className="overflow-x-auto my-4">
    <table className="w-full border-collapse text-sm">
      {head && (
        <thead>
          <tr className="bg-muted">
            <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">{head[0]}</th>
            <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">{head[1]}</th>
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map(([a, b], i) => (
          <tr key={i}>
            <th className="border border-border px-3 py-2 text-left font-medium text-foreground align-top bg-muted/40 whitespace-nowrap">
              {a}
            </th>
            <td className="border border-border px-3 py-2 align-top text-foreground/80">{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
