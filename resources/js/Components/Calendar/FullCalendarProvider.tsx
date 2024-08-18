import { useLocalStorage } from "react-use";
import * as React from "react";
import useScreenStore from "@narsil-ui/Stores/screenStore";

type FullCalendarProviderState = {
	date: string;
	title: string;
	view: string;
};

type FullCalendarProviderAction = {
	setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	setView: React.Dispatch<React.SetStateAction<string | undefined>>;
};

type FullCalendarProviderType = FullCalendarProviderState & FullCalendarProviderAction;

const FullCalendarContext = React.createContext<FullCalendarProviderType>({} as FullCalendarProviderType);

export interface FullCalendarProviderProps {
	children: React.ReactNode;
}

const FullCalendarProvider = ({ children }: FullCalendarProviderProps) => {
	const { isMobile } = useScreenStore();

	const defaultDate = new Date().toISOString();
	const defaultView = isMobile ? "listMonth" : "timeGridWeek";

	const [date, setDate] = useLocalStorage(`app:calendar:date`, defaultDate);
	const [view, setView] = useLocalStorage(`app:calendar:view`, defaultView);

	const [title, setTitle] = React.useState<string>("");

	return (
		<FullCalendarContext.Provider
			value={{
				date: date ?? defaultDate,
				title: title,
				view: view ?? defaultView,
				setDate: setDate,
				setTitle: setTitle,
				setView: setView,
			}}
		>
			{children}
		</FullCalendarContext.Provider>
	);
};

export function useFullCalendar() {
	const context = React.useContext(FullCalendarContext);

	if (!context) {
		throw new Error("useFullCalendar must be used within a <FullCalendarProvider />");
	}

	return context;
}

export default FullCalendarProvider;
