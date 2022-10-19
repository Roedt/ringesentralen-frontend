import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

const Tekstboksen = ({ readOnly }) => {
  const classname = readOnly ? 'editor-input' : 'editor-input editor-input-writable'
  return (
    <RichTextPlugin
      contentEditable={<ContentEditable className={classname} readOnly={readOnly} />}
      placeholder={<div />}
    />
  )
}

export default Tekstboksen
