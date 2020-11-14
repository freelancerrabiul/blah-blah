const link = [ 'www.test0.com', 'www.test1.com', 'www.test2.com' ];
const content = [ 'this is test0 content', 'this is test1 content', 'this is test2 content' ]

const players = link.map((value, index) => {
  const linkContent = content[index];
  return (
    <div>
      <Reactplayer url="{value}" />
      <ControlLabel>{linkContent}</ControlLabel>
    </div>
  );
});