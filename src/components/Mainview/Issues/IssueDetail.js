import React from "react";
import { Container, Column } from "./Issues.styles";
import {
  Tags,
  Priority,
  TableProfilePicture,
  SubData,
} from "../../../Atomics/Table";

export default function IssueDetail(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <Container
        style={{
          minWidth: "50vh",
          maxWidth: "90vh",
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
        <Column
          style={{
            height: "100%",
            width: "70ch",
            marginTop: "1%",
            paddingLeft: "0.25%",
            marginRight: "5%",
            fontSize: "1.1em",
            lineHeight: "1.25em",
            overflowY: "scroll",
          }}
        >
          {props.description}
        </Column>
        <Column style={{ overflow: "hidden" }}>
          Submitted by:
          <div style={{ display: "flex" }}>
            <TableProfilePicture src={props.submitter.profile_picture} />
            <p>
              {props.submitter.first_name + " " + props.submitter.last_name}
            </p>
          </div>
          <br />
          Label:
          {props.labels.map((item, id) => (
            <Tags key={id} style={{ backgroundColor: item.color }}>
              {item.name}
            </Tags>
          ))}
          <br />
          Priority:
          <Priority>{props.priority}</Priority>
          <br />
          Assigned to:
          <div style={{ display: "flex", marginTop: "1%" }}>
            {props.assignees.map((item, id) => (
              <>
                <TableProfilePicture key={id} src={item.profile_picture} />
                <p key={id}>{item.first_name + " " + item.last_name}</p>
              </>
            ))}
          </div>
        </Column>
      </Container>
    </div>
  );
}
