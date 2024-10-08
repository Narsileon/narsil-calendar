import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@narsil-ui/Components";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import Calendar from "@fullcalendar/react";

export interface FullCalendarNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
	calendar: React.MutableRefObject<Calendar>;
}

const FullCalendarNavigation = React.forwardRef<HTMLDivElement, FullCalendarNavigationProps>(
	({ calendar, className }, ref) => {
		const { trans } = useTranslationsStore();

		return (
			<div
				ref={ref}
				className={cn("flex items-center", className)}
			>
				<Button
					className='rounded-r-none border-r'
					size='icon'
					onClick={() => {
						calendar?.current?.getApi().prev();
					}}
				>
					<ChevronLeft />
				</Button>
				<Button
					className='rounded-l-none rounded-r-none border-x'
					onClick={() => {
						calendar?.current?.getApi().today();
					}}
				>
					{trans("Today")}
				</Button>
				<Button
					className='rounded-l-none border-l'
					size='icon'
					onClick={() => {
						calendar?.current?.getApi().next();
					}}
				>
					<ChevronRight />
				</Button>
			</div>
		);
	}
);

export default FullCalendarNavigation;
