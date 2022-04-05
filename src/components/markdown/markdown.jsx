/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";


/**
 * mrkdown 组件
 * @param {String} md md文档来源
 * @return {ReactComponent}
 */

function Markdown(props) {
    // const [mark,setMark] = React.useState();
    // marked.setOptions({
    //     renderer: new marked.Renderer(),
    //     highlight: function(code) {
    //         return hljs.highlightAuto(code).value;
    //     }, // highlight.js css expects a top-level 'hljs' class.
    //     pedantic: false,
    //     gfm: true,
    //     breaks: false,
    //     sanitize: false,
    //     smartLists: true,
    //     smartypants: false,
    //     xhtml: false
    // });
    // React.useEffect(() => {
    //     setMark(marked.parse(props.md))
    // },[])
    
    return <>
      <ReactMarkdown
        children={props.md}
        escapeHtml={false}
        remarkPlugins={[remarkParse,remarkGfm]}
        rehypePlugins={[]}
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
                    <code className='common-code' {...props}>
                        {children}
                    </code>
                )
            }
            }} />
        
  </>;
}

export default Markdown;
