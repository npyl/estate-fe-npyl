import {
	Box,
	Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

import {
	KeyboardArrowUp as KeyboardArrowUpIcon,
	KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";

import { Fragment, useState } from "react";

import { ContactNotification } from "src/types/notification";
import Iconify from "src/components/iconify";

export function createRow(props: ContactNotification) {
	const {
		customerName,
		customerEmail,
		customerMobile,
		message,
		notificationDate,
		notificationType,
		propertyCode,
		tourDate,
		tourTime,
		tourType,
		viewed,
	} = props;

	return {
		customerName,
		customerEmail,
		customerMobile,
		message,
		notificationDate,
		notificationType,
		propertyCode,
		tourDate,
		tourTime,
		tourType,
		history: [
			{
				date: "2020-01-05",
				customerId: "11091700",
				amount: 3,
			},
			{
				date: "2020-01-02",
				customerId: "Anonymous",
				amount: 1,
			},
		],
	};
}

function Row(props: { row: ReturnType<typeof createRow> }) {
	const { row } = props;
	const [open, setOpen] = useState(false);

	const onRemove = () => {};

	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.customerName}
				</TableCell>
				<TableCell align="right">{row.customerEmail}</TableCell>
				<TableCell align="right">{row.customerMobile}</TableCell>
				<TableCell align="right">{row.message}</TableCell>
				<TableCell align="right">{row.notificationDate}</TableCell>

				<TableCell align="right">
					<IconButton onClick={onRemove}>
						<Iconify icon={"eva:trash-2-outline"} />
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								History
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Customer</TableCell>
										<TableCell align="right">Amount</TableCell>
										<TableCell align="right">Total price ($)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.history.map((historyRow) => (
										<TableRow key={historyRow.date}>
											<TableCell component="th" scope="row">
												{historyRow.date}
											</TableCell>
											<TableCell>{historyRow.customerId}</TableCell>
											<TableCell align="right">{historyRow.amount}</TableCell>
											<TableCell align="right">
												{Math.round(historyRow.amount * -1 * 100) / 100}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
}

export const CollapsibleTable = (props: {
	rows: ReturnType<typeof createRow>[];
}) => {
	const { rows } = props;

	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Mobile</TableCell>
						<TableCell align="right">Message</TableCell>
						<TableCell align="right">Notification Date</TableCell>
						<TableCell />
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row.customerName} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
