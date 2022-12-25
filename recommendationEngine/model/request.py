from marshmallow import Schema, fields
from .packageDimensions import PackageDimensions,PackageDimensionsSchema

class Request():
  def __init__(partner_id, to_add, from_add, package_weight, package_dim, delivery_req):
    self.partner_id = partner_id
    self.to_add = to_add
    self.from_add = from_add
    self.package_weight = package_weight
    self.package_dim = package_dim
    self.delivery_req = delivery_req

  def __repr__(self):
    return '<Request(name={self.partner_id!r})>'.format(self=self)


class RequestSchema(Schema):
  partner_id = fields.Str()
  to_add = fields.Str();
  from_add = fields.Str();
  package_weight = fields.Str();
  package_dim = PackageDimensions;
  delivery_req = fields.Str();

