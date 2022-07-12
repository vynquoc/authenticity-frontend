import React from 'react'
import {FaFacebook, FaInstagram, FaYoutube, FaTwitter} from "react-icons/fa"


const Footer = () => {
    return (
        <div className="flex justify-around bg-black text-gray-400 py-10 mt-5">
            <div>
                <h1 className="text-sm mb-3">Thông Tin Liên Hệ</h1>
                <p className="text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>          
                    371 Nguyễn Kiệm, phường 3, quận Gò Vấp, Tp.HCM
                </p>
                <p className="text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    authenticity@mail.com
                </p>
                <p className="text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    0912345678 / 0904123321
                </p>
                <p></p>
            </div>
            <div className="social">
                <h1 className="text-sm mb-3">Mạng Xã Hội</h1>
                <p className="text-xs flex items-center">
                    <FaFacebook className="mr-2" /> facebook.com/authenticity
                </p>
                <p className="text-xs flex items-center">
                    <FaInstagram  className="mr-2"/> @authenticity_market
                </p>
                <p className="text-xs flex items-center">
                    <FaYoutube className="mr-2"/> youtube.com/authenticity
                </p>
                <p className="text-xs flex items-center">
                    <FaTwitter className="mr-2"/> @authenticity_market
                </p>
            </div>
        </div>
    )
}

export default Footer
