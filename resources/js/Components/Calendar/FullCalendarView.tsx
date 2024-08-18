import { useLocalStorage } from "react-use";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Calendar from "@fullcalendar/react";
import Select from "@narsil-ui/Components/Select/Select";
import SelectContent from "@narsil-ui/Components/Select/SelectContent";
import SelectGroup from "@narsil-ui/Components/Select/SelectGroup";
import SelectItem from "@narsil-ui/Components/Select/SelectItem";
import SelectLabel from "@narsil-ui/Components/Select/SelectLabel";
import SelectTrigger, { SelectTriggerProps } from "@narsil-ui/Components/Select/SelectTrigger";
import SelectValue from "@narsil-ui/Components/Select/SelectValue";
import useScreenStore from "@narsil-ui/Stores/screenStore";

export interface FullCalendarViewProps extends Partial<SelectTriggerProps> {
	calendar: React.MutableRefObject<Calendar>;
}

const views = {
	dayGrid: ["dayGridDay", "dayGridWeek", "dayGridMonth"],
	timeGrid: ["timeGridDay", "timeGridWeek"],
	list: ["listDay", "listWeek", "listMonth", "listYear"],
};

const FullCalendarView = ({ calendar, ...props }: FullCalendarViewProps) => {
	const { isMobile } = useScreenStore();
	const { trans } = useTranslationsStore();

	const [view, setView] = useLocalStorage(`app:calendar:view`, isMobile ? "listMonth" : "timeGridWeek");

	return (
		<Select
			onValueChange={(value) => {
				setView(value as string);

				calendar?.current?.getApi().changeView(value as string);
			}}
		>
			<SelectTrigger {...props}>
				<SelectValue>{trans(view ?? "")}</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{Object.entries(views).map(([view, subviews]) => (
					<SelectGroup key={view}>
						<SelectLabel>{trans(view)}</SelectLabel>
						{subviews.map((subview) => (
							<SelectItem
								value={subview}
								key={subview}
							>
								{trans(subview)}
							</SelectItem>
						))}
					</SelectGroup>
				))}
			</SelectContent>
		</Select>
	);
};

export default FullCalendarView;
