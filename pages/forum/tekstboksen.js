import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'

function ReadOnlyContentEditable (props) {
  const [editor] = useLexicalComposerContext()
  const ref = useCallback(
    (rootElement) => {
      editor.setRootElement(rootElement)
    },
    [editor]
  )

  return (
    <div
      contentEditable={false}
      id={props.id}
      ref={ref}
    />
  )
}

const Tekstboksen = ({ readOnly }) => {
  const classname = readOnly ? 'editor-input' : 'editor-input editor-input-writable'
  const contentEditable = readOnly ? <ReadOnlyContentEditable /> : <ContentEditable className={classname} readOnly={readOnly} />
  return (
    <RichTextPlugin
      contentEditable={contentEditable}
      placeholder={<div />}
    />
  )
}

export default Tekstboksen
