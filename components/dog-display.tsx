import Image from 'next/image'
 
export default function Dog() {
  return (
    <Image
      src='/images/weimaraner.jpg'
      alt="a weimaraner dog"
      width={200}
      height={200}
    />
  )
}