import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, dom, obj, act

[policy_definition]
p = sub, dom, obj, act

[role_definition]
g = _, _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub, r.dom) && r.dom == p.dom && r.obj == p.obj && r.act == p.act
`);

export const adapter = new StringAdapter(`
p, superuser, octo, posts, list
p, superuser, octo, posts, show
p, superuser, octo, posts, delete
p, superuser, octo, posts, edit
p, superuser, octo, posts, create
p, user, octo, posts, list
p, user, octo, posts, create
p, user, octo, posts, show
`);
