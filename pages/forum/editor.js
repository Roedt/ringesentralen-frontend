import ExampleTheme from './themes/ExampleTheme'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import Tekstboksen from './tekstboksen'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'

const editorConfig = (innhold) => {
  return {
  theme: ExampleTheme,
  onError (error) {
    throw error
  },
  editorState: innhold ? JSON.stringify(innhold) : undefined,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
}
}

const Editor = ({ listener, readOnly, eksisterendeInnhold }) => {
  return (
    <LexicalComposer initialConfig={editorConfig(eksisterendeInnhold)}>
      <div className='editor-container'>
        {!readOnly && <ToolbarPlugin />}
        <div className='editor-inner'>
          <Tekstboksen readOnly={readOnly} />
          {!readOnly && <HistoryPlugin />}
          <AutoFocusPlugin />
          {!readOnly && <OnChangePlugin onChange={listener} />}
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
        </div>
      </div>
    </LexicalComposer>
  )
}

export default Editor
