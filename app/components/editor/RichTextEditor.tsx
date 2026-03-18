'use client'

import { useState, useCallback } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = '开始写作...',
}: RichTextEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
  }, [])

  const handleBold = () => execCommand('bold')
  const handleItalic = () => execCommand('italic')
  const handleUnderline = () => execCommand('underline')
  const handleH1 = () => execCommand('formatBlock', 'H1')
  const handleH2 = () => execCommand('formatBlock', 'H2')
  const handleH3 = () => execCommand('formatBlock', 'H3')
  const handleUL = () => execCommand('insertUnorderedList')
  const handleOL = () => execCommand('insertOrderedList')
  const handleBlockquote = () => execCommand('formatBlock', 'BLOCKQUOTE')
  const handleCode = () => execCommand('formatBlock', 'PRE')

  const handleInsertLink = () => {
    const url = prompt('输入链接地址：')
    if (url) execCommand('createLink', url)
  }

  const handleInsertImage = () => {
    const url = prompt('输入图片 URL：')
    if (url) execCommand('insertImage', url)
  }

  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-xl overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      {/* 工具栏 */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-800 bg-gray-800/50 flex-wrap">
        <button onClick={handleBold} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition" title="加粗">
          <span className="font-bold">B</span>
        </button>
        <button onClick={handleItalic} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition" title="斜体">
          <span className="italic">I</span>
        </button>
        <button onClick={handleUnderline} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition" title="下划线">
          <span className="underline">U</span>
        </button>
        
        <div className="w-px h-6 bg-gray-700 mx-2" />
        
        <button onClick={handleH1} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition text-sm font-bold" title="标题 1">
          H1
        </button>
        <button onClick={handleH2} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition text-sm font-bold" title="标题 2">
          H2
        </button>
        <button onClick={handleH3} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition text-sm font-bold" title="标题 3">
          H3
        </button>
        
        <div className="w-px h-6 bg-gray-700 mx-2" />
        
        <button onClick={handleUL} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition" title="无序列表">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button onClick={handleOL} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition" title="有序列表">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 16h16" />
          </svg>
        </button>
        <button onClick={handleBlockquote} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition" title="引用">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
          </svg>
        </button>
        
        <div className="w-px h-6 bg-gray-700 mx-2" />
        
        <button onClick={handleInsertLink} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition" title="插入链接">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        <button onClick={handleInsertImage} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition" title="插入图片">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        
        <div className="flex-1" />
        
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition"
          title="全屏"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m4 0l-5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>

      {/* 编辑区 */}
      <div
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        className="w-full min-h-[400px] px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none prose prose-invert prose-lg max-w-none"
        style={{ minHeight: isFullscreen ? 'calc(100vh - 200px)' : '400px' }}
      />
    </div>
  )
}
