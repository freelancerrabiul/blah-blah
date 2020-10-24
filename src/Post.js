import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";
function Post() {
  return (
    // style={{marginTop: "60px"}}

    <div className="container">
      <Card className="rounded-0 shadow">

        <CardHeader tag="h3">Featured</CardHeader>
        <CardImg
          className="rounded-0"
          top
          width="100%"
          src="https://specials-images.forbesimg.com/imageserve/5d2392b234a5c400084abe23/960x0.jpg?fit=scale"
          alt="Loading"
        />

        <CardBody>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <form>
            <input
              type="text"
              style={{ outlineStyle: "none" }}
              className="post__input btn-block border-0 "
            />
            <button type="submit" className="inline-block d-none">
              Post
            </button>
          </form>
        </CardBody>
      </Card>

      <Card className="rounded-0 shadow">
        
        <CardHeader tag="h3">Featured</CardHeader>
        <CardImg
          className="rounded-0"
          top
          width="100%"
          src="https://specials-images.forbesimg.com/imageserve/5d2392b234a5c400084abe23/960x0.jpg?fit=scale"
          alt="Loading"
        />
        <CardTitle>Card title</CardTitle>
        <CardBody>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <form>
            <input
              type="text"
              style={{ outlineStyle: "none" }}
              className="post__input btn-block border-0 "
            />
            <button type="submit" className="inline-block d-none">
              Post
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Post;
