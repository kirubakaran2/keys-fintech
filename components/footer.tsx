'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface ContactData {
  address: string;
  phone: string;
  email: string;
}

export default function Footer() {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mb-4">
              Keys Fintech Info
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Professional financial advisory services helping you secure your future
              with the right investments and insurance plans.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/life-insurance"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Life Insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/products/health-insurance"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Health Insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/products/term-insurance"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Term Insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/products/family-insurance"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Family Insurance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/portfolio-management"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Portfolio Management
                </Link>
              </li>
              <li>
                <Link
                  href="/services/investment-advice"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Investment Advice
                </Link>
              </li>
              <li>
                <Link
                  href="/services/financial-consultant"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Financial Consultant
                </Link>
              </li>
              <li>
                <Link
                  href="/services/how-to-invest"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  How to Invest?
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              Contact
            </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-2 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">No 10, kaliyamman kovil street, sai nagar 
Virugambakkam</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-2 text-emerald-600 flex-shrink-0" />
                  <a
                    href={`tel:${9444567777}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                  9444567777
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-2 text-emerald-600 flex-shrink-0" />
                  <a
                    href={`mailto:christy@christel.in`}
                    className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    christy@christel.in
                  </a>
                </li>
              </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Keys Fintech Info. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Terms of Service
              </Link>
              <Link
                href="/disclaimer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
