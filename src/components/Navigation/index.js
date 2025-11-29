import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigationData } from '../../data';
import './styles/Navigation.css';

const Navigation = ({ navData = navigationData }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [theme, setTheme] = useState(navData.theme.current);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		const savedTheme = localStorage.getItem('theme') || navData.theme.current;
		setTheme(savedTheme);
		document.documentElement.setAttribute('data-theme', savedTheme);

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [navData.theme]);

	const toggleTheme = () => {
		const options = navData.theme.options;
		const currentIndex = options.indexOf(theme);
		const nextIndex = (currentIndex + 1) % options.length;
		const newTheme = options[nextIndex];
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
	};

	const navItems = navData.menuItems.map(item => ({
		name: item.label,
		href: item.href,
		id: item.id,
	}));

	const handleNavClick = (href) => {
		setIsMobileMenuOpen(false);
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<motion.header
			className={`navigation ${isScrolled ? 'scrolled' : ''}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<div className="nav-container">
				<motion.div
					className="nav-logo"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<motion.a
						href={navData.logo.href} 
						onClick={(e) => {
							e.preventDefault();
							handleNavClick(`#${navData.logo.id}`);
						}}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0 * 0.1 + 0.3 }}
						whileHover={{ y: -2 }}
					>
						<span className="logo-text">{navData.logo.text}</span>
						<span className="logo-dot">.</span>
					</motion.a>
				</motion.div>

				{/* Desktop Navigation */}
				<nav className="nav-links desktop-nav">
					{navItems.map((item, index) => (
						<motion.a
							key={item.id}
							href={item.href}
							className="nav-link"
							onClick={(e) => {
								e.preventDefault();
								handleNavClick(item.href);
							}}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 + 0.3 }}
							whileHover={{ y: -2 }}
						>
							{item.name}
						</motion.a>
					))}
				</nav>

				<div className="nav-actions">
					{/* Theme Toggle */}
					<motion.button
						className="theme-toggle"
						onClick={toggleTheme}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
					>
						{navData.theme.icons[theme]}
					</motion.button>

					{/* Mobile Menu Toggle */}
					<motion.button
						className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.9 }}
					>
						<span></span>
						<span></span>
						<span></span>
					</motion.button>
				</div>
			</div>

			{/* Mobile Navigation */}
			<motion.nav
				className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
				initial={false}
				animate={{
					height: isMobileMenuOpen ? 'auto' : 0,
					opacity: isMobileMenuOpen ? 1 : 0
				}}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
			>
				<div className="mobile-nav-content">
					{navItems.map((item, index) => (
						<motion.a
							key={item.name}
							href={item.href}
							className="mobile-nav-link"
							onClick={(e) => {
								e.preventDefault();
								handleNavClick(item.href);
							}}
							initial={{ opacity: 0, x: -50 }}
							animate={{
								opacity: isMobileMenuOpen ? 1 : 0,
								x: isMobileMenuOpen ? 0 : -50
							}}
							transition={{ delay: index * 0.1 }}
						>
							{item.name}
						</motion.a>
					))}
				</div>
			</motion.nav>
		</motion.header>
	);
};

export default Navigation;
