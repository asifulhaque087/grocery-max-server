








module.exports.makeRelation = async () => {};











module.exports.deletePopulatedRelation = async (childParent, parent, childParentId, parentChildrens) => {


    if (childParent) {
        // 4. find parent  and delete that child from that parent
        let findCat = await parent.findById({ _id: childParentId });

        const filteredSubcategories = findCat.subcategories.filter(
          (subcategory) => subcategory.id != id
        );

        findCat.subcategories = filteredSubcategories;
        await findCat.save();
      }
    
    
    
    



    // if (child.parent) {
    //     // 4. find parent  and delete that child from that parent
    //     let findParent = await parent.findById({ _id: child.parent.id });

    //     const filteredChildrens = findParent.childrens.filter(
    //       (child) => child.id != id
    //     );

    //     findParent.childrens = filteredChildrens;
    //     await findParent.save();
    //   }
    
    
    
};
