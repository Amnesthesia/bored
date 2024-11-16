import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Paper, TextField } from '@mui/material';
import { noop } from 'lodash';
import React, { useCallback, useEffect } from 'react';

interface APIKeyContext {
  isOpen: boolean;
  apiKey?: string | null;
  open(): void;
  close(): void;
}
const Context = React.createContext<APIKeyContext>({
  isOpen: false,
  apiKey: null,
  open: noop,
  close: noop
});

export function useAPIKey() {
  return React.useContext(Context);
}

export function APIKeyProvider(props: React.PropsWithChildren<object>) {
  const { children } = props;
  const [apiKey, setApiKey] = React.useState<string | null>(null);
  const [visible, setVisible] = React.useState(false);

  const [internal, setInternal] = React.useState<string | null>(null);

  useEffect(() => {
    const k = localStorage.getItem('__key');
    if (k) {
      setApiKey(k);
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  const setApiKeyFromInternal = useCallback(() => {
    if (!internal) return;
    setVisible(false);
    setApiKey(internal);
    localStorage.setItem('__key', internal);
  }, [internal]);

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  return (
    <Context.Provider value={{ apiKey, open, close, isOpen: visible }}>
      <Dialog open={visible} fullWidth>
        <DialogTitle>OpenAI API Key</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            value={internal}
            onChange={(e) => setInternal(e.target.value)}
            fullWidth
            label='OpenAI API Key'
            onKeyDown={(e) => (e.key === 'Enter' ? setApiKeyFromInternal() : null)}
            helperText='This application requires an OpenAI API key to function, please enter yours below'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={setApiKeyFromInternal}>Save</Button>
        </DialogActions>
      </Dialog>
      {children}
    </Context.Provider>
  );
}
