---
title: <span class='text-span'>Contribute</span> to DevRel Diaries
image: /images/nathan-dumlao-e47gwnA7KGk-unsplash.jpg
image_caption: "Photo by <a href=\"https://unsplash.com/@nate_dumlao?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText\">Nathan Dumlao</a> on <a href=\"https://unsplash.com/s/photos/diary?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText\">Unsplash</a>"
description: "Contributing to DevRel Diaries"
date: 2021-07-15
---
## <span class='text-span'>How</span> this works

We want to let you share your story. But we also recognize that sharing a personal story, especially about Mental Health, can be a difficult thing to do. So we've created a process that we hope will make it easier for you.

We want you to feel safe sharing your story.

The very **first** thing though is to make sure you're aware of, and agree to, our [Code of Conduct](/code_of_conduct/) and our [Privacy Policy](/privacy_policy). We take these *very* seriously. You should too.

We're making it as easy as we can for you to share your story in whatever way makes you the most confortable. Below are the instructions for the two _best_ ways to contribute your story. If neither of these work for you, please [reach out](mailto:stories@devreldiaries.com) to us and let's work together to find something that works.

## <span class='text-span'>Contributing</span> anonymously

If you'd like to contribute your story anonymously (or if you just don't want to hassle with GitHub), you can use the editor we have provided. There are some **required** fields, and some **optional** fields. The required fields are:

* **Title** - This is the title of your story. It will be displayed on the main page, and in the story itself.
* **Description** - This is a short description of your story. It will be displayed on the main page, as a sub-heading
* **Name or Pseudonym** - You can use your own name, or a made-up pseudonym. Whichever makes you most comfortable. **Do not** use your real name if you don't want it shown publicly. **Do not** use a pseudonym that mimics someone else's name, or that is offensive or otherwise inappropriate.
* **Tags** - These are the tags that will be used to categorize your story. Simply type whatever tag you want, followed by a `,` and your tag will be added. Please make sure it is appropriate. We reserve the right to remove any tags that we feel are inappropriate.
* **Header Image** - This is the image that will be displayed on the main page, and in the story itself. The header image on your story will be displayed like the header images on this and other pages here, so try to format it appropriately. The image you choose will be shown, slightly reduced in size, directly below the field once you've chosen it. If you don't like the way it looks, you can click the `X` button to remove it and choose another image.
* **Caption** - This is the caption that will be displayed with your header image. It will be displayed like the caption on this and other pages here, and you can include basic HTML like `<a> </a>` tags in case you want to use [unsplash](https://unsplash.com) for images like we do.

There are some **optional** fields as well:

* **Email Address** - If you include your email address it will be linked in your story, so that people can contact you if they have questions. We will not use your email address for any other purpose. **Please note** that if you are submitting your story anonymously, but use your real email address, pepole will be able to see your email address. If you don't want that, please use an anonymized email address.
* **Twitter Handle** - If you include your Twitter handle it will be linked in your story. **Please note** that if you are submitting your story anonymously, but use your real Twitter handle, pepole will be able to see your Twitter handle. If you don't want that, please use an anonymized Twitter handle.
* **Website** - If you want your story linked back to your website, you can include it here. **Please note** that if you are submitting your story anonymously, but use your real website, pepole will be able to see your website. If you don't want that, please use an anonymized website.
* **Avatar** - If you want to include an avatar with your story, you can upload it here. The avatar will be displayed on the main page, and in the story itself.

### <span class='text-span'>Editing</span> your story

Once you've filled out the **required** fields you can begin writing your story. The editor is a [Markdown](https://www.markdownguide.org/) editor, so you can use Markdown to format your story. If you want to include images in your story, you can either link to the externale source using `![alt text](https://example.com/image.jpg)` or you can upload the image to your story using the `Choose File` button above the editor. When you select a local file in this way it will be uplaoded to our server, and a thumbnail-sized version will be displayed on the page. To include the image in your story, place the cursor where you want the image inserted and click the `Use image` checkbox next to the image. You will see the Markdown code for the image inserted at the cursor location. You can then edit the Markdown code to include the alt text you want to use. If you want to remove the image from your story, click the `X` button next to the image. Clicking the preview button will show you what your story will look like when it is published, including any images you've included.

Publishing your story will look something like this:

{{< video "/images/howto.mp4" "video-div">}}
<p></p>

### <span class='text-span'>Submitting</span> your story

Once you're done editing your story, you can submit it by clicking the `Submit` button at the bottom of the page. Before you are able to clik the `Submit` button you must confirm that you agree to the [Code of Conduct](/code_of_conduct/) and our [Privacy Policy](/privacy_policy). If you don't agree, you can't submit your story. If you do agree, you can click the `Submit` button and your story will be submitted for review. We will review your story and publish it as soon as we can. If we have any questions or concerns we will reach out to you (if possible) and work with you to resolve them. If we can't reach you, we may have to remove your story.

## <span class='text-span'>Contributing</span> using GitHub

If you don't want to be anonymous, you can simply clone the repository for this site at [DevrelDiaries on GitHub](https://github.com/davidgs/dev-rel-diaries), write your story in markdown, and submit a pull request. We'll review it and publish it.

## <span class='text-span'>Writing</span> your story

Create a new directory in the `content/posts` directory using the title of your story (by convention, we suggest using the title of your story, all lower-case, with spaces replaced by `-`s. If your story will be called "My great story" you'd create a directory `content/posts/my-great-story/` Start a new file in this directory called `index.md`. . Add the following to the top of the file:

```
---
title: <span class='text-span'>My</span> great Story
date: 2022-10-04
image: posts/my-great-story/images/header-my-header-image.jpg
image_caption: On Camera!
description: A new one
author: Hank
author_twitter: hank
author_avatar: /posts/my-great-story/images/avatar-your-avatar.png
tags: [tag1, tag2, tag3]
author_email: foo@bar.com
author_website: http://example.com/
---

```

Create a new directory in your `content/posts/my-great-story/` directory called `images`. Upload your header image to this directory, and name it `header-your-image-name.jpg`. Upload your avatar image to this directory, and name it `avatar-my-avatar.png`. Edit the `index.md` file you created earlier, and add your story. When you're done, submit a pull request.

## <span class='text-span'>Optional</span> fields

* **author_email** - If you include your email address it will be linked in your story, so that people can contact you if they have questions. We will not use your email address for any other purpose. **Please note** that if you are submitting your story anonymously, but use your real email address, pepole will be able to see your email address. If you don't want that, please use an anonymized email address.
* **author_twitter** - If you include your Twitter handle it will be linked in your story. **Please note** that if you are submitting your story anonymously, but use your real Twitter handle, pepole will be able to see your Twitter handle. If you don't want that, please use an anonymized Twitter handle.
* **author_website** - If you want your story linked back to your website, you can include it here. **Please note** that if you are submitting your story anonymously, but use your real website, pepole will be able to see your website. If you don't want that, please use an anonymized website.
