import { useEffect, useState } from 'react';
import axios from 'axios';
import { is401, is403 } from '../../lib/utils';
import { router } from 'next/router';
import Tekstboksen from './tekstboksen';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import ExampleTheme from './themes/ExampleTheme';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { AutoLinkNode, LinkNode } from '@lexical/link';

const Traad = ({ traadId }) => {
  const [traad, setTraad] = useState()

  async function hentTraad () {
    try {
      const { data } = await axios.get('/api/backend/forum/traader/traad/' + traadId.underforum + '/' + traadId.tittel, { withCredentials: true })
      setTraad(data)
    } catch (error) {
      if (is401(error)) {
        router.push('/login?komFra=/forum')
      } else if (is403(error)) {
        router.push('/sperret')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    hentTraad()
  }, [traadId])

  const editorConfig = (innhold) => {
    return {
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError (error) {
      throw error
    },
    editorState: innhold ? JSON.stringify(innhold) : undefined,
    // Any custom nodes go here
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

  return (
    <>
      <li className='mb-1 py-1'>
        <strong>{traadId.tittel}</strong>
        <br />
        {traad && traad.innhold.innhold &&
        <LexicalComposer initialConfig={editorConfig(traad.innhold.innhold)}>
          <div className='editor-container'>
            <div className='editor-inner'>
              <Tekstboksen readOnly />
              <ListPlugin />
              <LinkPlugin />
              <AutoLinkPlugin />
              <ListMaxIndentLevelPlugin maxDepth={7} />
            </div>
          </div>
        </LexicalComposer>}

      </li>
      <hr />
    </>
  )
}

export default Traad
