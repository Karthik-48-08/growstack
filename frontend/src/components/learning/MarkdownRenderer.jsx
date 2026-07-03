import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MermaidRenderer from './MermaidRenderer';

/**
 * GfG/W3Schools-flavoured Markdown renderer for GrowStack reading content.
 *
 * Features:
 *  - GitHub-flavoured markdown (tables, task lists, strikethrough)
 *  - Inline HTML support (for Mermaid diagrams embedded directly in markdown body)
 *  - Python (and any other language) code blocks with syntax highlighting
 *  - ```mermaid ``` blocks rendered as live Mermaid diagrams
 *  - Heading auto-slug for deep linking
 *
 * Receives the raw markdown string via `children` for backward compatibility,
 * or pass `source` explicitly. Either works.
 */
export default function MarkdownRenderer({ children, source }) {
  const markdown = source ?? children ?? '';

  return (
    <div className="prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          // ── Code blocks & inline code ────────────────────────────────
          code({ inline, className, children: codeChildren, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const value = String(codeChildren).replace(/\n$/, '');

            // Mermaid block: render as live diagram instead of code
            if (!inline && match && match[1] === 'mermaid') {
              return <MermaidRenderer source={value} id={`md-${Math.random().toString(36).slice(2, 10)}`} />;
            }

            // Other code blocks: syntax-highlight with Prism one-dark
            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg !bg-black/60 !my-4 !p-4 border border-white/10 text-sm"
                  {...props}
                >
                  {value}
                </SyntaxHighlighter>
              );
            }

            // Inline code: styled <code>
            return (
              <code
                className="bg-black/60 text-secondary px-1.5 py-0.5 rounded text-[0.9em] font-mono"
                {...props}
              >
                {codeChildren}
              </code>
            );
          },

          // ── Headings ────────────────────────────────────────────────
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mt-8 mb-3 text-white border-b border-white/10 pb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold mt-6 mb-2 text-primary" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-semibold mt-4 mb-2 text-secondary" {...props} />
          ),

          // ── Paragraphs & text ────────────────────────────────────────
          p: ({ node, ...props }) => (
            <p className="text-gray-200 leading-relaxed my-3" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="text-white font-semibold" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="text-gray-300 italic" {...props} />
          ),

          // ── Lists ────────────────────────────────────────────────────
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-outside ml-6 my-3 text-gray-200 space-y-1" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-outside ml-6 my-3 text-gray-200 space-y-1" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-gray-200" {...props} />
          ),

          // ── Links ────────────────────────────────────────────────────
          a: ({ node, ...props }) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline underline-offset-2 hover:text-primary"
              {...props}
            />
          ),

          // ── Tables ───────────────────────────────────────────────────
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4 border border-white/10 rounded-lg">
              <table className="min-w-full text-sm" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-primary/10 text-white" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-2 text-left font-semibold border-b border-white/10" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-2 border-b border-white/5 text-gray-200" {...props} />
          ),

          // ── Misc ────────────────────────────────────────────────────
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-secondary pl-4 my-4 italic text-gray-300 bg-white/5 py-2 rounded-r"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-white/10" {...props} />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
