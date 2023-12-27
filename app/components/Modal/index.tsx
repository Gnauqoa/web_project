import {
	Box,
	ClickAwayListener,
	Modal as MUIModal,
	type ModalProps,
} from '@mui/material'
import useResponsive from '~/hooks/useResponsive'
import useScreenSize from '~/hooks/useScreenSize'

const Modal = ({ children, onClose, ...props }: ModalProps) => {
	const lgUp = useResponsive('up', 'lg')
	const { width } = useScreenSize()
	return (
		<MUIModal {...props} onClose={onClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: width > 280 ? (lgUp ? 400 : 300) : 260,
					height: '100%',
					justifyContent: 'center',
					':focus': {
						outline: 'none',
					},
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					borderRadius: '8px',
					padding: '12px 16px',
				}}
			>
				<ClickAwayListener
					onClickAway={(event: MouseEvent | TouchEvent) =>
						onClose && onClose(event, 'backdropClick')
					}
				>
					{children}
				</ClickAwayListener>
			</Box>
		</MUIModal>
	)
}

export default Modal
