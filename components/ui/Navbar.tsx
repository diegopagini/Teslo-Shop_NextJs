/** @format */
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { UiContext } from '../../context';

export const Navbar = () => {
	const { asPath, push } = useRouter();
	const { toggleSideMenu } = useContext(UiContext);
	const [searchTerm, setSearchTerm] = useState('');
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const onSearchTerm = () => {
		if (searchTerm.trim().length === 0) return;
		push(`/search/${searchTerm}`);
	};

	return (
		<AppBar>
			<Toolbar>
				<NextLink href='/' passHref>
					<Link display='flex' alignItems='center'>
						<Typography variant='h6'>Teslo |</Typography>
						<Typography sx={{ ml: 0.5 }}>Shop</Typography>
					</Link>
				</NextLink>

				<Box flex={1} />

				<Box
					className='fadeIn'
					sx={{
						display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
					}}>
					<NextLink href='/category/women' passHref>
						<Link>
							<Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
						</Link>
					</NextLink>
					<NextLink href='/category/men' passHref>
						<Link>
							<Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
						</Link>
					</NextLink>
					<NextLink href='/category/kid' passHref>
						<Link>
							<Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
						</Link>
					</NextLink>
				</Box>

				<Box flex={1} />

				{/* mobile */}
				<IconButton sx={{ display: { sx: 'flex', sm: 'none' } }} onClick={toggleSideMenu}>
					<SearchOutlined />
				</IconButton>

				{/* {desktop} */}
				{isSearchVisible ? (
					<Input
						className='fadeIn'
						sx={{
							display: { xs: 'none', sm: 'flex' },
						}}
						autoFocus
						type='text'
						placeholder='Buscar...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton onClick={() => setIsSearchVisible(false)}>
									<ClearOutlined />
								</IconButton>
							</InputAdornment>
						}
					/>
				) : (
					<IconButton
						onClick={() => setIsSearchVisible(true)}
						className='fadeIn'
						sx={{
							display: { xs: 'none', sm: 'flex' },
						}}>
						<SearchOutlined />
					</IconButton>
				)}

				<NextLink href='/cart' passHref>
					<Link>
						<IconButton>
							<Badge badgeContent={2} color='secondary'>
								<ShoppingCartOutlined />
							</Badge>
						</IconButton>
					</Link>
				</NextLink>

				<Button onClick={toggleSideMenu}>Menu</Button>
			</Toolbar>
		</AppBar>
	);
};
