import logo from "../assets/images.jpeg"

function Navbar() {
  return (
	<nav>
		<header className="flex items-center gap-2 py-2">
			<div className="w-[4vw]">
				<img src={logo} alt="" className="w-[100%] rounded-full animate-spin"/>
			</div>
			<ul className="flex items-center font-bold">
				<li>Chrome</li>
				<li>chat</li>
				<li>AI</li>
			</ul>
		</header>
	</nav>
  )
}

export default Navbar