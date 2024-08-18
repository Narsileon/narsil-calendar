import * as React from "react";
import Calendar from "@fullcalendar/react";
import SectionTitle, { SectionTitleProps } from "@narsil-ui/Components/Section/SectionTitle";

export interface FullCalendarTitleProps extends SectionTitleProps {
	calendar: React.MutableRefObject<Calendar>;
}

const FullCalendarTitle = React.forwardRef<HTMLHeadingElement, FullCalendarTitleProps>(
	({ calendar, ...props }, ref) => (
		<SectionTitle
			ref={ref}
			{...props}
		>
			{calendar?.current?.getApi().view.title}
		</SectionTitle>
	)
);

export default FullCalendarTitle;
