/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮样式
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
// 设置高亮的语言
import { jsx, javascript, sass, scss } from "react-syntax-highlighter/dist/esm/languages/prism";

const code = ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={coy}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

export default code;
