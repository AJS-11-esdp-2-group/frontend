import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	CircularProgress,
	Alert,
	AlertTitle,
} from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children?: React.ReactNode;
	isLoading: boolean;
	actionButtonLabel: string;
	onActionButtonClick: () => void;
	isError?: boolean;
	successMessage?: string;
	isSuccess?: boolean;
	errorMessage?: string;
}

const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	isLoading,
	actionButtonLabel,
	onActionButtonClick,
	isError,
	isSuccess,
	successMessage,
	errorMessage,
}: Props) => {
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
			{isError && (
				<Alert severity="error">
					<AlertTitle>Error</AlertTitle>
					{errorMessage}
				</Alert>
			)}
			{isSuccess && (
				<Alert severity="success">
					<AlertTitle>success</AlertTitle>
					{successMessage}
				</Alert>
			)}
			<DialogActions>
				<Button onClick={onClose} disabled={isLoading}>
					Отмена
				</Button>
				<LoadingButton
					onClick={onActionButtonClick}
					loading={isLoading}
					disabled={isError}
				>
					{actionButtonLabel}
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default Modal;
