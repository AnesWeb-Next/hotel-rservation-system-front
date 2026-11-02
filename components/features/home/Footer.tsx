import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-black">
      <div className="flex flex-wrap items-start gap-10 md:gap-15 xl:gap-35">
        <Link href="/">
          <Image
            width={157}
            height={40}
            src={assets.logo}
            alt="Logo"
            className={`h-9 w-auto`}
          />
        </Link>

        <div>
          <p className="text-slate-100 font-semibold">Product</p>

          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Support
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Pricing
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Affiliate
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-slate-100 font-semibold">Resources</p>

          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Company
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Blogs
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Community
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Careers
                <span className="text-xs text-white bg-indigo-600 rounded-md ml-2 px-2 py-1">
                  We’re hiring!
                </span>
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-slate-100 font-semibold">Legal</p>

          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Privacy
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:text-indigo-600 transition">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
        <p className="max-w-60">
          Making every customer feel valued—no matter the size of your audience.
        </p>

        <div className="flex items-center gap-4 mt-3">
          <Image
            src={assets.instagramIcon}
            alt="instegram-icon"
            className="w-6 hover:text-indigo-500 transition cursor-pointer"
          />
          <Image
            src={assets.facebookIcon}
            alt="facebook-icon"
            className="w-6 hover:text-indigo-500 cursor-pointer"
          />
          <Image
            src={assets.twitterIcon}
            alt="twitter-icon"
            className="w-6 hover:text-indigo-500 cursor-pointer"
          />
          <Image
            src={assets.linkendinIcon}
            alt="linkendin-icon"
            className="w-6 hover:text-indigo-500 cursor-pointer"
          />
        </div>

        <p className="mt-3 text-center">
          © 2025 <a href="https://prebuiltui.com">PrebuiltUI</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
