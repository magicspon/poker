import Nav from "../components/nav"
import Cat from "../svgs/cat.svg"

export default () => {
	return (
		<div>
			<Cat />
			<Nav />
			<div className="hero">
				<h1 className="title">Next.js + Tailwind CSS</h1>
			</div>
		</div>
	)
}
