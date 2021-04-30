export default function formatDate(date) {
    return new Intl.DateTimeFormat('en-GB', {dateStyle: 'full'}).format(date)
}