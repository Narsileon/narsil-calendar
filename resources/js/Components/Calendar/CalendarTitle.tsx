import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import SectionTitle, { SectionTitleProps } from "@narsil-ui/Components/Section/SectionTitle";

export interface CalendarTitleProps extends SectionTitleProps {
	calendar: React.MutableRefObject<FullCalendar>;
}

const CalendarTitle = React.forwardRef<HTMLHeadingElement, CalendarTitleProps>(({ calendar, ...props }, ref) => (
	<SectionTitle
		ref={ref}
		{...props}
	>
		{calendar?.current?.getApi().view.title}
	</SectionTitle>
));

export default CalendarTitle;
