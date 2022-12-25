from marshmallow import Schema, fields

class PackageDimensions():
   def __init__(self,length,width,height):
     self.length = length
     self.width = width
     self.height = height 

   def __repr__(self):
    return '<PackageDimensions(volume=self.length*self.width*self.height)>'.format(self=self)


class PackageDimensionsSchema(Schema):
    length = fields.Number();
    width = fields.Number();
    height = fields.Number();
