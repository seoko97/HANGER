import React from 'react';
import Link from 'next/link';

const HashTag = ({ content }) => (
	<>
		{content.split(/(#[^\s#]+)/g).map((v, i) => {
			if (v.match(/(#[^\s#]+)/)) {
				// return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
				return (
					<Link href={`/`} key={i}>
						<a>{v}</a>
					</Link>
				);
			}
			return v;
		})}
	</>
);

export default HashTag;
