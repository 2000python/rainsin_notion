/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function markdown(props) {
    return <>
      <ReactMarkdown
        children={props.md}
        escapeHtml={false}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                    <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={coldarkDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    />
                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                )
            }
        }}/>
  </>;
}

export default markdown;
