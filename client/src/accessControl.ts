import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
p, user, actinobacteria, (list)
p, user, actinobacteria/*, (show)

p, user, myactinobacteria, (list)|(create)
p, user, myactinobacteria/*, (edit)|(show)|(delete)

p, user, assembly, (list)|(create)
p, user, assembly/*, (edit)|(show)|(delete)

p, user, processeddata, (list)|(create)
p, user, processeddata/*, (edit)|(show)|(delete)

p, manager, actinobacteria, (list)
p, manager, actinobacteria/*, (show)

p, manager, myactinobacteria, (list)|(create)
p, manager, myactinobacteria/*, (edit)|(show)|(delete)

p, manager, assembly, (list)|(create)
p, manager, assembly/*, (edit)|(show)|(delete)

p, manager, processeddata, (list)|(create)
p, manager, processeddata/*, (edit)|(show)|(delete)

p, manager, genera, (list)|(create)
p, manager, genera/*, (edit)|(delete)

p, manager, culturemedium, (list)|(create)
p, manager, culturemedium/*, (edit)|(delete)

p, manager, typestrain, (list)|(create)
p, manager, typestrain/*, (edit)|(delete)

p, manager, enzyme, (list)|(create)
p, manager, enzyme/*, (edit)|(delete)

p, admin, actinobacteria, (list)
p, admin, actinobacteria/*, (show)

p, admin, myactinobacteria, (list)|(create)
p, admin, myactinobacteria/*, (edit)|(show)|(delete)

p, admin, assembly, (list)|(create)
p, admin, assembly/*, (edit)|(show)|(delete)

p, admin, processeddata, (list)|(create)
p, admin, processeddata/*, (edit)|(show)|(delete)

p, admin, genera, (list)|(create)
p, admin, genera/*, (edit)

p, admin, users, (list)|(create)
p, admin, users/*, (edit)|(delete)

p, admin, culturemedium, (list)|(create)
p, admin, culturemedium/*, (edit)|(delete)

p, admin, typestrain, (list)|(create)
p, admin, typestrain/*, (edit)|(delete)

p, admin, enzyme, (list)|(create)
p, admin, enzyme/*, (edit)|(delete)

`);