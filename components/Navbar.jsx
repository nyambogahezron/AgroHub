export default function Header() {
  return (
    <div className='flex justify-between items-center p-5 bg-[#004d40] text-white'>
      {/* <img src='logo.png' alt='Boomitra Logo' className='h-10' /> */}
      <h2 className='text-2xl font-bold'>Boomitra</h2>
      <div className='hidden md:flex gap-4'>
        <a href='#solutions'>SOLUTIONS</a>
        <a href='#science-tech'>SCIENCE & TECH</a>
        <a href='#projects'>PROJECTS</a>
        <a href='#insights'>INSIGHTS</a>
        <a href='#about-us'>ABOUT US</a>
      </div>
      <button className='bg-green-500 text-white p-2'>Contact Us</button>
    </div>
  );
}
