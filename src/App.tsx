import ContextSelector, { ContextResult } from '@equinor/fusion-react-context-selector';

import { useCallback, useState } from 'react';

import { ThemeProvider, theme } from '@equinor/fusion-react-styles';
ThemeProvider;

const singleItem = (props: unknown) => {
  return Object.assign({ id: '0', title: 'Dummy title' }, props);
};

const fakeApi = (query: string) => {
  /* min length */
  const min = 3;
  const items = [];
  if (!query || query.length < min) {
    items.push(
      singleItem({
        title: `Add ${min - query.length} chars to search`,
        isDisabled: true,
      })
    );
    return items;
  }
  const allResults = [
    {
      id: '0001',
      title: 'Johan Castberg',
      isError: true,
      meta: 'error_outlined',
    },
    {
      id: '0002',
      title: 'Johan Sverdrup Business Case',
      subTitle: 'some project description...',
      isSelected: true,
      meta: 'check',
    },
    {
      id: '0003',
      title: 'Johan Sverdrup Phase 2',
    },
    {
      id: '0004',
      title: 'Johan Castberg Prosjektportal',
    },
  ];

  for (const item of allResults) {
    if (item.title.toLowerCase().indexOf(query) > -1) {
      items.push(item);
    }
  }

  if (!items.length) {
    items.push(singleItem({ title: 'No matches...', isDisabled: true }));
  }

  return items;
};

export const resolver = {
  searchQuery: async (query: string) => {
    try {
      return fakeApi(query);
    } catch (e) {
      return [
        singleItem({
          item: 'API Error',
          subTitle: e,
          isDisabled: true,
          isError: true,
        }),
      ];
    }
  },
};

function App() {
  const [txt, setTxt] = useState('test');

  const onAction = useCallback(
    (e: any) => setTxt(e.target.value ?? ''),
    [setTxt]
  );
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '480px',
          height: '250px',
          padding: '5rem',
        }}
      >
        <ContextSelector
          placeholder="dette er en test"
          initialText="hello"
          resolver={resolver}
        />
        <div>{txt}</div>
      </div>
    </ThemeProvider>
  );
}

export default App;
