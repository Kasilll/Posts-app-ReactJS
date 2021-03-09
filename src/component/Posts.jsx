import React from 'react'
import styled from 'styled-components'
import { Input } from '@material-ui/core'

const Main = styled.div`
	display: flex;
	flex-direction: column;
`

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-top: 2rem;
`
const Post = styled.div`
	width: 360px;
	min-height: 230px;
	margin-top: 1.5rem;
	background-color: #e9e9e9;
	padding: 10px;
	border-radius: 5px;
	align-items: stretch;
	position: relative;
`
const PostsUsername = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	font-weight: bold;
	position: absolute;
	bottom: 25px;
`

function filtersPosts(arr, value) {
	if (value === '') {
		return arr
	} else {
		const resultFilters = arr.filter((el) => {
			const filterByUsername = el.user.username.toLowerCase().includes(value.toLowerCase())
			const filterByName = el.user.name.toLowerCase().includes(value.toLowerCase())
			const filterByBody = el.body.toLowerCase().includes(value.toLowerCase())
			const filterByTitle = el.title.toLowerCase().includes(value.toLowerCase())
			if (filterByUsername || filterByName || filterByBody || filterByTitle) return el
			else return false
		})
		return resultFilters
	}
}

export default function Posts({ data }) {
	const [ value, setvalue ] = React.useState('')

	function handlerChangeInput(e) {
		setvalue(e.target.value)
	}
	
	const renderPosts = filtersPosts(data, value)

	return (
		<Main>
			<Input
				value={value}
				onChange={handlerChangeInput}
				placeholder="Search"
				inputProps={{ 'aria-label': 'description' }}
				style={{ width: '400px', margin: '0 auto' }}
			/>
			<Container>
				{renderPosts[0] ? (
					renderPosts.map((el) => (
						<Post key={el.id}>
							<div>
								<h3>{el.title}</h3>
								<div>{el.body}</div>
							</div>
							<PostsUsername>
								<span>Name: {el.user.name}</span>
								<span>UserName: {el.user.username}</span>
							</PostsUsername>
						</Post>
					))
				) : (
					<div>Ничего не найдено :(</div>
				)}
			</Container>
		</Main>
	)
}
