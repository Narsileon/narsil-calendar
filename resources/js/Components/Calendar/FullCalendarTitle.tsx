import { useFullCalendar } from "./FullCalendarProvider";
import * as React from "react";
import SectionTitle, { SectionTitleProps } from "@narsil-ui/Components/Section/SectionTitle";

export interface FullCalendarTitleProps extends SectionTitleProps {}

const FullCalendarTitle = React.forwardRef<HTMLHeadingElement, FullCalendarTitleProps>(({ ...props }, ref) => {
	const { title } = useFullCalendar();

	return (
		<SectionTitle
			ref={ref}
			{...props}
		>
			{title}
		</SectionTitle>
	);
});

export default FullCalendarTitle;
