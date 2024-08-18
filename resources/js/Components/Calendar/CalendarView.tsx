import { useLocalStorage } from "react-use";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Combobox, { ComboboxProps } from "@narsil-ui/Components/Combobox/Combobox";
import FullCalendar from "@fullcalendar/react";
import useScreenStore from "@narsil-ui/Stores/screenStore";

export interface CalendarViewProps extends Partial<ComboboxProps> {
	calendar: React.MutableRefObject<FullCalendar>;
}

const views = {
	dayGrid: ["dayGridDay", "dayGridWeek", "dayGridMonth"],
	timeGrid: ["timeGridDay", "timeGridWeek"],
	list: ["listDay", "listWeek", "listMonth", "listYear"],
};

const CalendarView = ({ calendar, ...props }: CalendarViewProps) => {
	const { isMobile } = useScreenStore();
	const { trans } = useTranslationsStore();

	const viewOptions = Object.entries(views).map(([view, subviews]) => ({
		label: trans(view),
		options: subviews.map((subview) => ({
			label: trans(subview),
			value: subview,
		})),
	}));

	const [view, setView] = useLocalStorage(`app:calendar:view`, isMobile ? "listMonth" : "timeGridWeek");

	return (
		<Combobox
			value={view ?? ""}
			onChange={(value) => {
				setView(value as string);

				calendar?.current?.getApi().changeView(value as string);
			}}
			options={viewOptions}
			{...props}
		/>
	);
};

export default CalendarView;
