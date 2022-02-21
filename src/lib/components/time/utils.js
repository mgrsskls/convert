import list from "./list.js";

export const getDateObjectForGivenDatetimeAndTimeZone = (datetimeValue, timeZoneFromValue) => {
	const timestampForDatetimeInputWithLocalTimeZone = new Date(datetimeValue).getTime();

	const timestampForCurrentDatetimeWithTimeZoneFromInput =
		list.includes(timeZoneFromValue) || timeZoneFromValue === "UTC"
			? new Date(
					standardizeDate(
						Intl.DateTimeFormat(["en-GB"], {
							timeZone: timeZoneFromValue,
							year: "numeric",
							month: "numeric",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
						}).format(new Date(datetimeValue))
					)
			  ).getTime()
			: 0;

	const differenceBetweenLocalAndInputTimeZone =
		timestampForCurrentDatetimeWithTimeZoneFromInput - timestampForDatetimeInputWithLocalTimeZone;

	return new Date(
		timestampForDatetimeInputWithLocalTimeZone - differenceBetweenLocalAndInputTimeZone
	);
};

export const formatDateForInput = (date) => {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getDatetimeObject = (timeZone, date) => {
	return timeZone.length && date
		? new Date(
				standardizeDate(
					new Intl.DateTimeFormat(["en-GB"], {
						timeZone,
						year: "numeric",
						month: "numeric",
						day: "numeric",
						hour: "numeric",
						minute: "numeric",
					}).format(date)
				)
		  )
		: null;
};

export const getCurrentLocalTime = () => {
	const date = new Date();

	return date;
};

export const getTimeZonesDifference = (from, to) => {
	let string;

	const difference = to ? (to.getTime() - from.getTime()) / 60 / 60 / 1000 : null;

	if (typeof difference === "number") {
		if (difference > 0) {
			string = `+${difference}`;
		} else if (difference === 0) {
			string = `±${difference}`;
		} else {
			string = difference.toString();
		}

		return string;
	}

	return null;
};

export const getDatetimeParts = (string) => {
	const arr = string
		.split("T")
		.flatMap((item) => {
			item = item.split("-");
			return item;
		})
		.flatMap((item) => {
			item = item.split(":");
			return item;
		})
		.map((item) => parseInt(item, 10));

	arr[1] = arr[1] - 1;

	return arr;
};

export const standardizeDate = (dateTime) => {
	const [date, time] = dateTime.split(", ");

	return `${date.split("/").reverse().join("-")}T${time}`;
};
