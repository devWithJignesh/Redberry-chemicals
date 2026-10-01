import { useEffect, useRef, useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  RemoveFormatting,
  ListPlus,
  Code
} from 'lucide-react';

export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Type details here...',
  minHeight = '180px',
  error = false,
  id,
  name,
}) {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    insertUnorderedList: false,
    insertOrderedList: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
  });

  // Helper to format raw text to HTML linebreaks if needed
  const formatInitialValue = (val) => {
    if (!val) return '';
    // If it already contains HTML tags, return as is
    if (/<[a-z][\s\S]*>/i.test(val)) {
      return val;
    }
    // Otherwise convert plain text lines/bullets to HTML
    const lines = val.split('\n');
    return lines
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return '<div><br></div>';
        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
          return `<li>${trimmed.replace(/^[•\-]\s*/, '')}</li>`;
        }
        return `<div>${trimmed}</div>`;
      })
      .join('');
  };

  // Sync value when changed externally
  useEffect(() => {
    if (editorRef.current) {
      const formatted = formatInitialValue(value);
      if (editorRef.current.innerHTML !== formatted) {
        editorRef.current.innerHTML = formatted;
      }
    }
  }, [value]);

  const updateActiveStates = () => {
    try {
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikeThrough: document.queryCommandState('strikeThrough'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight'),
      });
    } catch {
      // Ignore queryCommandState errors if selection is not in document
    }
  };

  const handleInput = () => {
    if (editorRef.current && onChange) {
      const html = editorRef.current.innerHTML;
      const cleanValue = html === '<br>' || html === '<div><br></div>' ? '' : html;
      onChange({ target: { name, value: cleanValue } });
    }
    updateActiveStates();
  };

  const execCommand = (command, val = null) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      editorRef.current.focus();
    }
    handleInput();
  };

  const handleAddBulletItem = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    execCommand('insertUnorderedList');
  };

  return (
    <div className={`rich-text-editor-container ${isFocused ? 'focused' : ''} ${error ? 'error' : ''}`}>
      {/* Formatting Toolbar */}
      <div className="rich-text-toolbar" onMouseDown={(e) => e.preventDefault()}>
        <div className="rich-text-toolbar-group">
          <button
            type="button"
            className={`rich-text-btn ${activeFormats.bold ? 'active' : ''}`}
            onClick={() => execCommand('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            className={`rich-text-btn ${activeFormats.italic ? 'active' : ''}`}
            onClick={() => execCommand('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic size={15} />
          </button>
          <button
            type="button"
            className={`rich-text-btn ${activeFormats.underline ? 'active' : ''}`}
            onClick={() => execCommand('underline')}
            title="Underline (Ctrl+U)"
          >
            <Underline size={15} />
          </button>
          <button
            type="button"
            className={`rich-text-btn ${activeFormats.strikeThrough ? 'active' : ''}`}
            onClick={() => execCommand('strikeThrough')}
            title="Strikethrough"
          >
            <Strikethrough size={15} />
          </button>
        </div>

        <div className="rich-text-toolbar-divider" />

        <div className="rich-text-toolbar-group">
          <button
            type="button"
            className="rich-text-btn"
            onClick={() => execCommand('formatBlock', '<h1>')}
            title="Heading 1"
          >
            <Heading1 size={15} />
          </button>
          <button
            type="button"
            className="rich-text-btn"
            onClick={() => execCommand('formatBlock', '<h2>')}
            title="Heading 2"
          >
            <Heading2 size={15} />
          </button>
          <button
            type="button"
            className="rich-text-btn"
            onClick={() => execCommand('formatBlock', '<h3>')}
            title="Heading 3"
          >
            <Heading3 size={15} />
          </button>
          <button
            type="button"
            className="rich-text-btn"
            onClick={() => execCommand('formatBlock', '<blockquote>')}
            title="Quote Block"
          >
            <Quote size={15} />
          </button>
        </div>

        <div className="rich-text-toolbar-divider" />

        <div className="rich-text-toolbar-group">
          <button
            type="button"
            className={`rich-text-btn ${activeFormats.insertUnorderedList ? 'active' : ''}`}
            onClick={() => execCommand('insertUnorderedList')}
            title="Bullet List"
          >
            <List size={15} />
          </button>
          <button
            type="button"
            className={`rich-text-btn ${activeFormats.insertOrderedList ? 'active' : ''}`}
            onClick={() => execCommand('insertOrderedList')}
            title="Numbered List"
          >
            <ListOrdered size={15} />
          </button>
          <button
            type="button"
            className="rich-text-btn btn-bullet-helper"
            onClick={handleAddBulletItem}
            title="Add Bullet Point"
          >
            <ListPlus size={15} />
            <span>Add Bullet</span>
          </button>
        </div>

        <div className="rich-text-toolbar-divider" />

        <div className="rich-text-toolbar-group">
          <button
            type="button"
            className={`rich-text-btn ${activeFormats.justifyLeft ? 'active' : ''}`}
            onClick={() => execCommand('justifyLeft')}
            title="Align Left"
          >
            <AlignLeft size={15} />
          </button>
          <button
            type="button"
            className={`rich-text-btn ${activeFormats.justifyCenter ? 'active' : ''}`}
            onClick={() => execCommand('justifyCenter')}
            title="Align Center"
          >
            <AlignCenter size={15} />
          </button>
          <button
            type="button"
            className={`rich-text-btn ${activeFormats.justifyRight ? 'active' : ''}`}
            onClick={() => execCommand('justifyRight')}
            title="Align Right"
          >
            <AlignRight size={15} />
          </button>
        </div>

        <div className="rich-text-toolbar-divider" />

        <div className="rich-text-toolbar-group">
          <button
            type="button"
            className="rich-text-btn"
            onClick={() => execCommand('undo')}
            title="Undo"
          >
            <Undo size={15} />
          </button>
          <button
            type="button"
            className="rich-text-btn"
            onClick={() => execCommand('redo')}
            title="Redo"
          >
            <Redo size={15} />
          </button>
          <button
            type="button"
            className="rich-text-btn text-rose-600"
            onClick={() => execCommand('removeFormat')}
            title="Clear Formatting"
          >
            <RemoveFormatting size={15} />
          </button>
        </div>
      </div>

      {/* Editor Editable Area */}
      <div
        id={id}
        ref={editorRef}
        className="rich-text-content"
        contentEditable
        suppressContentEditableWarning
        style={{ minHeight }}
        onInput={handleInput}
        onKeyUp={updateActiveStates}
        onMouseUp={updateActiveStates}
        onFocus={() => {
          setIsFocused(true);
          updateActiveStates();
        }}
        onBlur={() => setIsFocused(false)}
        data-placeholder={placeholder}
      />
    </div>
  );
}
