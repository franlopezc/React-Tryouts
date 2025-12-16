// Componente de error reutilizable

import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { RefreshCw } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  title?: string;
  onRetry?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  message, 
  title = 'Error',
  onRetry 
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Alert 
        severity="error" 
        sx={{ 
          borderRadius: 'var(--radius-lg)',
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
        {onRetry && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshCw size={16} />}
              onClick={onRetry}
              sx={{
                borderRadius: 'var(--radius-md)',
              }}
            >
              Reintentar
            </Button>
          </Box>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;