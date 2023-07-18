function Footer() {
  return (
    <div className="my-10 flex justify-center">
    <p className="text-foreground">
      &copy; {new Date().getFullYear()}, HouseHunter all rights reserved
    </p>
  </div>
  )
}

export default Footer