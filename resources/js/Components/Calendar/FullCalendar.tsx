import "@narsil-calendar/../css/app.scss";
import { CalendarOptions, DatesSetArg } from "@fullcalendar/core";
import { forwardRef } from "react";
import { usePage } from "@inertiajs/react";
import allLocales from "@fullcalendar/core/locales-all";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import moment from "moment";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import useScreenStore from "@narsil-ui/Stores/screenStore";
import ScrollArea from "@narsil-ui/Components/ScrollArea/ScrollArea";
import * as React from "react";

export interface FullCalendarProps extends CalendarOptions {}

const FullCalendar = forwardRef<Calendar, FullCalendarProps>(({ views, select, ...props }, ref) => {
	const { isMobile } = useScreenStore();

	const locale = usePage<GlobalProps>().props.shared.localization.locale;

	const [width, setWidth] = React.useState("100%");

	const LOCAL_STORAGE_FULL_CALENDAR_DEFAULT_VIEW = "fullCalendarDefaultView";

	const getWidth = (view: string) => {
		if (isMobile) {
			if (!view.includes("list") && !view.includes("Day")) {
				return "200%";
			}
		}

		return "100%";
	};

	const datesSet = (arg: DatesSetArg) => {
		setWidth(getWidth(arg.view.type));
		console.log(arg.view.type);
		localStorage.setItem(LOCAL_STORAGE_FULL_CALENDAR_DEFAULT_VIEW, arg.view.calendar.getDate().toISOString());
	};

	const plugins = [dayGridPlugin, interactionPlugin, listPlugin, rrulePlugin, timeGridPlugin];

	return (
		<ScrollArea
			className='h-full w-full overflow-hidden rounded-md border'
			orientation='horizontal'
		>
			<div
				className='h-full'
				style={{
					width: width,
				}}
			>
				<Calendar
					ref={ref}
					allDaySlot={true}
					datesSet={datesSet}
					dayMaxEvents={true}
					dayMaxEventRows={true}
					editable={false}
					eventMaxStack={10}
					eventTimeFormat={{
						hour: "2-digit",
						minute: "2-digit",
						hour12: locale == "en" ? true : false,
					}}
					firstDay={1}
					headerToolbar={false}
					height='100%'
					initialDate={
						localStorage.getItem(LOCAL_STORAGE_FULL_CALENDAR_DEFAULT_VIEW) !== null
							? localStorage.getItem(LOCAL_STORAGE_FULL_CALENDAR_DEFAULT_VIEW)
							: moment().toDate()
					}
					initialView='timeGridWeek'
					locale={locale}
					locales={allLocales}
					longPressDelay={500}
					nowIndicator={true}
					plugins={plugins}
					progressiveEventRendering={true}
					schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
					scrollTime='08:00'
					scrollTimeReset={true}
					slotMinTime='00:00'
					slotMaxTime='24:00'
					select={select}
					selectMirror={true}
					views={{
						day: {
							dayHeaderFormat: {
								weekday: "long",
							},
							titleFormat: {
								day: "numeric",
								month: "long",
								year: "numeric",
							},
						},
						week: {
							dayHeaderFormat: {
								day: "2-digit",
								weekday: isMobile ? "short" : "long",
							},
							titleFormat: {
								day: "numeric",
								month: "long",
								year: "numeric",
							},
						},
						month: {
							dayHeaderFormat: {
								weekday: isMobile ? "short" : "long",
							},
						},
						timeGrid: {
							slotLabelFormat: {
								days: 1,
								hour: "2-digit",
								minute: "2-digit",
								hour12: locale == "en" ? true : false,
							},
						},
						...views,
					}}
					weekNumbers={false}
					{...props}
				/>
			</div>
		</ScrollArea>
	);
});

export default FullCalendar;
